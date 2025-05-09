import { Review } from "../Models/Review";

export const fetchReviewById = async (token: string, id_user: string | undefined):Promise<Review[] | string> =>{
    try {
        const fetchReview = await fetch(`http://localhost:3000/reviews/article/${id_user}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
        });
        if(!fetchReview){
            return "no review";
        }
        const fetchReviewJson = fetchReview.json();
        return fetchReviewJson;

    } catch (error) {
        return "Internal server"     
    }
}