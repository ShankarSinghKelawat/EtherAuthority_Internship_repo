
// File: @openzeppelin/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/IERC20.sol)

pragma solidity >=0.4.16;

/**
 * @dev Interface of the ERC-20 standard as defined in the ERC.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

// File: @openzeppelin/contracts/security/ReentrancyGuard.sol


// OpenZeppelin Contracts (last updated v4.9.0) (security/ReentrancyGuard.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be _NOT_ENTERED
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}

// File: contracts/DexContract.sol


pragma solidity ^0.8.20;



contract DexContract is ReentrancyGuard {

    IERC20 public goldToken;

    struct Pool {
        uint256 reserveGold;
        uint256 reserveToken;
        bool exists;
    }

    mapping(address => Pool) public pools;

    constructor(address _goldToken) {
        goldToken = IERC20(_goldToken);
    }

    function registerToken(address token) external {
        require(token != address(goldToken), "Gold already registered");
        require(!pools[token].exists, "Token already registered");

        pools[token] = Pool({
            reserveGold: 0,
            reserveToken: 0,
            exists: true
        });
    }

    // --------------------
    // ADD LIQUIDITY
    // --------------------

    function addLiquidity(
        address token,
        uint256 goldAmount,
        uint256 tokenAmount
    ) external nonReentrant {

        require(pools[token].exists, "Pool not found");
        require(goldAmount > 0 && tokenAmount > 0, "Invalid amounts");

        Pool storage pool = pools[token];

        // First liquidity can be any ratio
        if (pool.reserveGold > 0 || pool.reserveToken > 0) {
            // ratio
            require(
                pool.reserveGold * tokenAmount ==
                pool.reserveToken * goldAmount,
                "Wrong ratio"
            );
        }

        goldToken.transferFrom(msg.sender, address(this), goldAmount);
        IERC20(token).transferFrom(msg.sender, address(this), tokenAmount);

        pool.reserveGold += goldAmount;
        pool.reserveToken += tokenAmount;
    }

    // --------------------
    // PRICE QUOTE
    // --------------------

    function getQuote(
        address fromToken,
        address toToken,
        uint256 amountIn
    ) public view returns (uint256) {

        require(amountIn > 0, "Invalid input");

        // Token -> Gold
        if (toToken == address(goldToken)) {
            Pool memory pool = pools[fromToken];
            return _getAmountOut(
                amountIn,
                pool.reserveToken,
                pool.reserveGold
            );
        }

        // Gold -> Token
        if (fromToken == address(goldToken)) {
            Pool memory pool = pools[toToken];
            return _getAmountOut(
                amountIn,
                pool.reserveGold,
                pool.reserveToken
            );
        }

        // Token -> Gold -> Token
        Pool memory poolIn = pools[fromToken];
        Pool memory poolOut = pools[toToken];

        uint256 goldOut = _getAmountOut(
            amountIn,
            poolIn.reserveToken,
            poolIn.reserveGold
        );

        return _getAmountOut(
            goldOut,
            poolOut.reserveGold,
            poolOut.reserveToken
        );
    }

    // --------------------
    // Exchange
    // --------------------

    function exchange(
    address fromToken,
    address toToken,
    uint256 amountIn
    ) external nonReentrant {

        require(amountIn > 0, "Invalid input");

        if (fromToken != address(goldToken)) {
            require(pools[fromToken].exists, "From token not supported");
        }

        if (toToken != address(goldToken)) {
            require(pools[toToken].exists, "To token not supported");
        }

        if (toToken == address(goldToken)) {
            _swapTokenToGold(fromToken, amountIn);
            return;
        }

        if (fromToken == address(goldToken)) {
            _swapGoldToToken(toToken, amountIn);
            return;
        }

        uint256 goldReceived = _swapTokenToGold(fromToken, amountIn);
        _swapGoldToToken(toToken, goldReceived);
    }


    // --------------------
    // INTERNAL SWAPS
    // --------------------

    function _swapTokenToGold(address token, uint256 amountIn)
        internal
        returns (uint256 goldOut)
    {
        Pool storage pool = pools[token];

        goldOut = _getAmountOut(
            amountIn,
            pool.reserveToken,
            pool.reserveGold
        );

        IERC20(token).transferFrom(msg.sender, address(this), amountIn);
        goldToken.transfer(msg.sender, goldOut);

        pool.reserveToken += amountIn;
        pool.reserveGold -= goldOut;
    }

    function _swapGoldToToken(address token, uint256 amountIn)
        internal
        returns (uint256 tokenOut)
    {
        Pool storage pool = pools[token];

        tokenOut = _getAmountOut(
            amountIn,
            pool.reserveGold,
            pool.reserveToken
        );

        goldToken.transferFrom(msg.sender, address(this), amountIn);
        IERC20(token).transfer(msg.sender, tokenOut);

        pool.reserveGold += amountIn;
        pool.reserveToken -= tokenOut;
    }

    // --------------------
    // AMM FORMULA
    // --------------------

    function _getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) internal pure returns (uint256) {

        require(reserveIn > 0 && reserveOut > 0, "No liquidity");

        uint256 amountInWithFee = (amountIn * 997) / 1000;

        return
            (reserveOut * amountInWithFee) /
            (reserveIn + amountInWithFee);
    }
}
