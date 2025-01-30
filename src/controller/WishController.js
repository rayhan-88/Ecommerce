import {RemoveWishListService, SaveWishListService, WishListService} from "../services/WishService.js";

export const SaveWishList = async (req, res) => {
    let result = await SaveWishListService(req);
    res.json(result)
}



export const RemoveWishList = async (req, res) => {
    let result = await RemoveWishListService(req);
        res.json(result)
}


export const WishList = async (req, res) => {
    let result = await WishListService(req)
    res.json(result)
}


















