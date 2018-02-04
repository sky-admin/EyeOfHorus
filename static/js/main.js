$(function () {

  $('#image').on('change', () => {
    var file = $('#image')[0].files[0]
    var reader = new FileReader()
    reader.onloadend = () => {
      const image = reader.result
      $('#show').attr('src', image)
    }
    reader.readAsDataURL(file)
  })

  $('#identify').on('click', () => {
    const image = $('#show').attr('src')
    $.ajax('identify', {
      method: 'post',
      data: {image},
      success (res) {
        let resultText = '遇到一些问题'
        if (res.errno === 0) {
          const username = res.data.result[0].uid
          const score = res.data.result[0].scores[0]
          resultText = `用户是 ${username} , 相似度分数为 ${score}`
        }
        $('#result').html(resultText)
      }
    })
  })

  $('#reg').on('click', () => {
    const image = $('#show').attr('src')
    const name = $('#name').val()
    if (validate(image, name))
      $.ajax('reg', {
        method: 'post',
        data: {image, name},
        success (res) {
          let resultText = '遇到一些问题'
          if (res.errno === 0) {
            resultText = '注册成功'
          }
          $('#result').html(resultText)
        }
      })
    else
      alert('信息遗漏')
  })

})

function validate (...params) {
  for (var i in params) {
    if (params[i] === undefined || params[i].length === 0) return false
  }
  return true
}
