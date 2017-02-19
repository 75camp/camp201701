const TIMEOUTS = 1000
const get = function (url, retry = 3) {
  let count = 0
  return new Promise((resolve, reject) => {
    const fetchData = function () {
      if (count++ > retry) {
        reject(`Fetch Data Error: Retried ${retry} times!`)
        return
      }
      let STO = setTimeout(fetchData, TIMEOUTS)
      fetch(url, res => res.text())
        .then(text => text.json())
        .then(dataObj => {
          clearTimeout(STO)
          if (dataObj && dataObj.code === 0) {
            resolve(dataObj.data)
          } else {
            fetchData()
          }
        })
        .catch(err => {
          clearTimeout(STO)
          fetchData()
        })
    }
    fetchData()
  })
}
export default {
  get
}
