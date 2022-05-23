const getDebitOrCredit = (value) => {
    if(value[0] === '-') {
        return 'Debit';
    } else {
        return 'Credit';
    }
}

module.exports = {
    getDebitOrCredit
}