$(function () {

  $('#identify').on('click', () => {
    console.log('click！')
    // console.log($('#image')[0])
    encodeImageToBase64AndSendToSever($('#image')[0], 'identify')
  })

})

function encodeImageToBase64AndSendToSever (element, url) {
  var file = element.files[0]
  var reader = new FileReader()
  reader.onloadend = () => {
    // console.log(reader.result)
    const image = reader.result
    $.ajax(url, {method: 'post', data: {image}})
  }
  reader.readAsDataURL(file)
}
