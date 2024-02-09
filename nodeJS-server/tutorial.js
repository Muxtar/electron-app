export default function myFilter(nums, callBack){
    let newNums = [];
    for(let i of nums){
        if(callBack(i)){
            newNums.push(i)
        }
    }
    return newNums;
}
