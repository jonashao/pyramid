export default function({ $axios, redirect }) {
  let storage = window.sessionStorage //初始化sessionStorage
  const token = storage.getItem('authentication-token')
  if (token) {
    $axios.setToken(token, 'Bearer')
  }
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    if (code === 401) {
      redirect('/')
    }
  })
}
