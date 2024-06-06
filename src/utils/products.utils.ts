import { IQueryParams } from "../interfaces/product.interface";

export const buildQuery = (params : IQueryParams) => {
    const query: any = {};

    if (params.id) query._id = params.id;
    if (params.category) query.category = params.category;
    if (params.subcategory) query.subcategory = params.subcategory;
    if (params.jobType) query.jobType = params.jobType;
    if (params.inStock !== undefined) query.inStock = params.inStock;
    if (params.workType) query.workType = params.workType;
    if (params.salaryRange) query.salaryRange = params.salaryRange;
    if (params.experience) query.experience = params.experience;
    if (params.qualification) query.qualification = params.qualification;
    if (params.jobLocation) query.jobLocation = params.jobLocation;

    return query;
}   