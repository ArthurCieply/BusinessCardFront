const SortTableData = (array, { sortBy, direction }) => {
    //return array.sort((a, b) => {
    return array.sort((a, b) => {
        if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return direction === 'ascending' ? -1 : 1
        if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return direction === 'ascending' ? 1 : -1
        return 0
    })
}

//  Works
//SortTableData(cards, { sortBy: 'cardName', direction: 'descending' })
//console.log(SortTableData(cards, { sortBy: 'cardName', direction: 'ascending' }))

export default SortTableData;

// I didn't bother accounting for sorting size of 101 < 18 because people over 100 shouldn't be working
