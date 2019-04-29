import * as models from '..';
import { CONSTANT } from '../../constant';

export class BaseDao {
	constructor() { }

	/**
	 * used to save data into database
	 * @param {string} model the model name
	 * @param {object} data object that you want to save
	 * @param {object} options
	 * @returns object OR error
	 */
	async save(model: ModelNames, data: any, options: any = null) {
		try {
			let response = await models[model].create(data);
			if (options && options["lean"]) {
				return JSON.parse(JSON.stringify(response));
			}
			return response;
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to save multiple data into database
	 * @param {string} model the model name
	 * @param {object} data array of objects that you want to save
	 * @param {object} options
	 * @returns array of objects OR error
	 */
	async insertMany(model: ModelNames, data: any, options: any = {}) {
		try {
			return await models[model].collection.insertMany(data, options);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to find multiple document from database
	 * @param {string} model
	 * @param {object} query
	 * @param {object} projection
	 * @param {object} options
	 * @returns array of objects OR error
	 */
	async find(model: ModelNames, query: any, projection: any, options: any, populateObj: any = null) {
		try {
			if (options && options["lean"]) {
				//in case when the lean option is present
				if (populateObj) return await models[model].find(query, projection, options).populate(populateObj).lean();
				return await models[model].find(query, projection, options).lean();
			}
			if (populateObj) return await models[model].find(query, projection, options).populate(populateObj);
			return await models[model].find(query, projection, options);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used for distinct query
	 * @param {string} model
	 * @param {string} path
	 * @param {object} query
	 */
	async distinct(model: ModelNames, path: string, query: any) {
		try {
			return await models[model].distinct(path, query);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to find single document from database
	 * @param {string} model
	 * @param {object} query
	 * @param {object} projection
	 * @param {object} options
	 */
	async findOne(model: ModelNames, query: any, projection: any, options: any, populateObj: any = null) {
		try {
			if (options && options["lean"]) {
				//in case when the lean option is present
				if (populateObj) return await models[model].findOne(query, projection, options).populate(populateObj).lean();
				return await models[model].findOne(query, projection, options).lean();
			}
			if (populateObj) return await models[model].findOne(query, projection, options).populate(populateObj);
			return await models[model].findOne(query, projection, options);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to find one document, update it and return it
	 * @param {string} model
	 * @param query
	 * @param update
	 * @param options
	 */
	async findOneAndUpdate(model: ModelNames, query: any, update: any, options: any = {}) {
		try {
			if (options && options["lean"]) {
				//in case when the lean option is present
				return await models[model].findOneAndUpdate(query, update, options).lean();
			}
			return await models[model].findOneAndUpdate(query, update, options);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to find one document and delete it
	 * @param {string} model
	 * @param query
	 * @param options
	 */
	async findOneAndRemove(model: ModelNames, query: any, options: any = {}) {
		try {
			if (options && options["lean"]) {
				return await models[model].findOneAndRemove(query, options).lean();
			}
			return await models[model].findOneAndRemove(query, options);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to update the data
	 * @param {string} model
	 * @param query
	 * @param update
	 * @param options
	 */
	async update(model: ModelNames, query: any, update: any, options: any = {}) {
		try {
			return await models[model].update(query, update, options);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to remove data
	 * @param {string} model
	 * @param query
	 */
	async remove(model: ModelNames, query: any) {
		try {
			return await models[model].remove(query);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to remove multiple data
	 * @param {string} model
	 * @param query
	 */
	async deleteMany(model: ModelNames, query: any) {
		try {
			return await models[model].deleteMany(query);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used to cound data
	 * @param {string} model
	 * @param query
	 */
	async count(model: ModelNames, query: any) {
		try {
			return await models[model].count(query);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * used for aggregation
	 * @param {string} model
	 * @param pipeline
	 */
	async aggregate(model: ModelNames, pipeline: any) {
		try {
			return await models[model].aggregate(pipeline);
		} catch (error) {
			return Promise.reject(error);
		}
	};

	/**
	 * Used for pagination using aggregation
	 * @param modelString 
	 * @param pipeline 
	 * @param limit 
	 * @param page 
	 */
	async paginate(modelString: ModelNames, pipeline?: Array<Object>, limit?: number, page?: number) {
		try {
			let Model = models[modelString];
			if (limit) {
				limit = Math.abs(limit);
				// If limit exceeds max limit
				if (limit > CONSTANT.MAX_LIMIT) {
					limit = CONSTANT.MAX_LIMIT;
				}
			} else {
				limit = CONSTANT.LIMIT;
			}

			if (page && (page != 0)) {
				page = Math.abs(page);
			} else {
				page = 1;
			}
			let skip = (limit * (page - 1));
			const result = await Model.aggregate(queryBuilder(pipeline, skip, limit, page)).exec();
			global.log(result, '======');
			let theTotal = result[0]['metadata'] && result[0]['metadata'][0] ? result[0]['metadata'][0]["total"] : 0
			let thePage = result[0]['metadata'] && result[0]['metadata'][0] ? result[0]['metadata'][0]["page"] : page
			let pageToSend = -1
			if (theTotal > (thePage * limit) ) {
				pageToSend = thePage + 1
			}
			return {
				data: result[0]['data'],
				total: theTotal,
				page: pageToSend,
				limit: limit
			};
		} catch (err) {
			console.error(err);
			throw new Error(err);
		}
	}
}

const queryBuilder = (pipeline: Array<Object>, skip: number, limit: number, page: number): Array<Object> => {
    let q = pipeline || [];

    q.push({
        $facet: {
            data: [
                { $skip: skip },
                { $limit: limit }
            ],
            metadata: [{ $count: "total" }, { $addFields: { page: page } }]
        }
    });
    return q;
}