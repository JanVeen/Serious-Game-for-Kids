class DemandController extends Controller
{
    constructor()
    {
        super();

        this.yearDays = GAME.model.config.yearDays;
        this.hours = GAME.model.config.hours;
    }

    doCustomerOrderGeneration()
    {
        // TODO every day, and every once in a while (structural and variable?).
        // Random component - About 1 per day = ~1.72, 2 per day = ~1.38.
        if (this._normalDistribution() > 1.72 || GAME.model.config.hours % 24 == 8) {
            const customerController = new CustomerController();
            customerController.generateOrder();
        }
    }
    /**
     * Returns a measure of demand for each product
     *
     * @param {Object} demand - The demand property on a Product
     */
    randomDemandGenerator(demand)
    {
        const mean = demand.mean + this._seasonalComponent(demand.seasonality);

        return Math.max(this._normalDistribution(mean, demand.variance), 0);
    }

    /**
     * Computes a seasonal modifier for specific demand.
     *
     * @param {Object} seasonality - The demand.seasonality property on a Product
     * @private
     */
    _seasonalComponent(seasonality)
    {
        if (!seasonality.hasSeasonality) {
            return 0;
        }

        const days = Math.floor(this.hours / 24);
        // Winter products peak in winter, summer products in summer. This correction ensures this happens.
        const bestSeason = seasonality.isWinterProduct ? Math.PI : 0;

        return seasonality.amplitude * Math.cos(2 * Math.PI * (days / this.yearDays) - bestSeason);
    }

    /**
     * http://stackoverflow.com/a/36481059
     *
     * @private
     *
     * @param {number} mean=0
     * @param {number} variance=1
     * @returns {number}
     */
    _normalDistribution(mean = 0, variance = 1)
    {
        const u = 1 - Math.random();
        const v = 1 - Math.random();

        const stdNormal =  Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

        return stdNormal * variance + mean;
    }
}
