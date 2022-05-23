const getFullType = (type) => {
    let finalType = "";
    switch (type) {
        case 'Exp':
            finalType = 'Expenditure';
            break;
        case 'Inv':
            finalType = 'Investment';
            break;
        case 'Cr':
            finalType = 'Credit Card';
            break;
        case 'Sal':
            finalType = 'Salary';
            break;
        case 'Bill':
            finalType = 'Bill';
            break;
    }
    
    return finalType;
}

module.exports = {
    getFullType
}