import Axios from "axios";

export function FetchCategories() {
    return (dispatch) => {
        return Axios.get("http://localhost/Reactjs-Weather-App/api/product/read.php").then((response) => {
            dispatch(FetchCategoriesData(response.data))
        }
        )
    }
};

export function FetchCategoriesData(categories) {
    return {
        type: FETCH_CATEGORY_COLOR,
        cat: categories
    }
}