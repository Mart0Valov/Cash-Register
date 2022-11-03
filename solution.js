const totalInCD = cid => {
    let totalSum = 0;
    cid.forEach(amount => totalSum += amount[1]);
    return totalSum;
}

const determineChange = (change, cid) => {
    const values = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    }
    const arrChange = [];
    for (let i = cid.length-1; i >= 0; i--) {
        const currAmount = {name: cid[i][0], amount: 0};
        while ((change - values[cid[i][0]] >= 0) && cid[i][1] > 0) {
            change = (change - values[cid[i][0]]).toFixed(2);
            currAmount.amount += values[cid[i][0]];
            cid[i][1] -= values[cid[i][0]];

        }
        arrChange.push(currAmount);
    }
    return {result: convertToList(arrChange), change, cid};
}

const convertToList = arr => {
    let result = [];
    arr.forEach(obj => {
        if (obj.amount > 0) {
            result.push([obj.name, obj.amount]);
        }
    });
    return result;
}

function checkCashRegister(price, cash, cid) {
    const registerStatus = {status: '', change: []};
    let change = cash - price;
    
    console.log(change);
    console.log(cid);
    
    if (change == totalInCD(cid)) {
        registerStatus.status = 'CLOSED';
        registerStatus.change = cid;
    } else {
        let res = determineChange(change, cid);
        if (Number(res.change) == 0 && totalInCD(res.cid) > 0) {
            registerStatus.status = 'OPEN';
            registerStatus.change = res.result;
        } else if (Number(res.change) > 0 && totalInCD(res.cid) >= 0) {
            registerStatus.status = 'INSUFFICIENT_FUNDS';
        }
    }
    
    return registerStatus;
}

// const res1 = checkCashRegister(19.5, 
//     20, 
//     [
//         ["PENNY", 1.01],
//         ["NICKEL", 2.05],
//         ["DIME", 3.1],
//         ["QUARTER", 4.25],
//         ["ONE", 90],
//         ["FIVE", 55],
//         ["TEN", 20],
//         ["TWENTY", 60],
//         ["ONE HUNDRED", 100]
//     ]
// );
// // console.log(res1);

// const res2 = checkCashRegister(
//     19.5, 
//     20, 
//     [
//         ["PENNY", 0.01],
//         ["NICKEL", 0],
//         ["DIME", 0],
//         ["QUARTER", 0],
//         ["ONE", 0],
//         ["FIVE", 0],
//         ["TEN", 0],
//         ["TWENTY", 0],
//         ["ONE HUNDRED", 0]
//     ]
// );
// // console.log(res2);

// const res3 = checkCashRegister(
//     3.26,
//     100,
//     [
//         ["PENNY", 1.01],
//         ["NICKEL", 2.05],
//         ["DIME", 3.1],
//         ["QUARTER", 4.25],
//         ["ONE", 90],
//         ["FIVE", 55],
//         ["TEN", 20],
//         ["TWENTY", 60],
//         ["ONE HUNDRED", 100]
//     ]
// );
// // console.log(res3);

// const res4 = checkCashRegister(
//     19.5,
//     20,
//     [
//         ["PENNY", 0.01],
//         ["NICKEL", 0],
//         ["DIME", 0],
//         ["QUARTER", 0],
//         ["ONE", 1],
//         ["FIVE", 0],
//         ["TEN", 0],
//         ["TWENTY", 0],
//         ["ONE HUNDRED", 0]
//     ]
// );
// console.log(res4);

const res5 = checkCashRegister(
    19.5,
    20,
    [
        ["PENNY", 0.5],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
    ]
);
console.log(res5);