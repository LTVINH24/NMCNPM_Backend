import productService from "../../services/productService.js";


const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;
const ROW_PER_PAGE=6;

const formatSortParam=(req)=>{
    const sort=req.query.sort||"price-desc";
    const SORT_FIELD_INDEX=0;
    const SORT_ORDER_INDEX=1;
    const sortParam=sort.split('-');
    const sortField=sortParam[SORT_FIELD_INDEX];
    const sortOrder=sortParam[SORT_ORDER_INDEX]==='asc'?1:-1;
    return {sortField,sortOrder};
}

const formatFilterParam=(req)=>{
    const brandsEncoded=req.query.brand||"";
    const categoriesEncoded=req.query.category||"";
    const brands=brandsEncoded?decodeURIComponent(brandsEncoded).split(','):[].map((brand)=>brand.toLowerCase());
    const categories=categoriesEncoded?decodeURIComponent(categoriesEncoded).split(','):[].map((category)=>category.toLowerCase());
    return {brands,categories};    
}

const formatPriceParam=(req)=>{
    const DEFAULT_MIN_PRICE=0;
    const DEFAULT_MAX_PRICE=Number.MAX_VALUE;
    const flag_null=req.query==null?true:false;
    const flag_nullString=(req.query.minPrice==='null')||(req.query.maxPrice==='null')?true:false;
    const badQueryParams=flag_null||flag_nullString;

    if(badQueryParams){
        return {minPrice:DEFAULT_MIN_PRICE,maxPrice:DEFAULT_MAX_PRICE};
    }
    const minPrice=req.query.minPrice;
    const maxPrice=req.query.maxPrice;
    return {minPrice,maxPrice};
};
const getQueryParams=(req)=>{
    const {page,rowPerPage}=req.query;
    const {brands,categories}=formatFilterParam(req);
    const {sortField,sortOrder}=formatSortParam(req);
    const {minPrice,maxPrice}=formatPriceParam(req);
    return {brands,categories,sortField,sortOrder,page,rowPerPage,minPrice,maxPrice};
}

const populateProduct=(product)=>{
    return {
        ...product,
        brand:product.brand_id.name,
        category:product.category_id.name,
    }
};

const populateProductSearch=(product)=>{
    delete product.category_id;
    delete product.brand_id;
    return {
        ...product,
        brand:product.brand.name,
        category:product.category.name,
    }
}


//controller

const getAllFilteredProducts = async (req, res) => {
    try {
        const {
            brands,categories,
            sortField,sortOrder,
            page=1,rowsPerPage=ROW_PER_PAGE,
            minPrice,maxPrice}=getQueryParams(req);
        const {onSales}=req.query;
        let products = await productService.getProducts({ brands, categories, sortField, sortOrder,minPrice,maxPrice });
        if(onSales==='true'){
            products=products.filter((product)=>product.salePrice>0);
        }
        const totalProducts=products.length;
        if(page && rowsPerPage){
            products=products.slice((page-1)*rowsPerPage,page*rowsPerPage);
        }
        return res.status(SUCCESS_STATUS).send({
            products:products.map(product=>populateProduct(product)),
            totalProducts,
        })
    }
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            message:"server error",
        });
    }
};

const searchProducts = async (req, res) => {
    try {
        const {
            brands,categories,
            sortField,sortOrder,
            page=1,rowsPerPage=ROW_PER_PAGE,
            minPrice,maxPrice}=getQueryParams(req);
        const {onSales}=req.query;
        const {search}=req.query;
        let products = await productService.getProductsBySearch(search,{ brands, categories, sortField, sortOrder,minPrice,maxPrice });
        if(onSales==='true'){
            products=products.filter((product)=>product.salePrice>0);
        }
        const totalProducts=products.length;
        if(page && rowsPerPage){
            products=products.slice((page-1)*rowsPerPage,page*rowsPerPage);
        }
        return res.status(SUCCESS_STATUS).send({
            products:products.map(product=>populateProductSearch(product)),
            totalProducts,
        })
    }
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            message:"server error",
        });
    }
};
export { getAllFilteredProducts,searchProducts};