import Vue from 'vue'
import COS from 'cos-js-sdk-v5'
import axios from 'axios'

const Bucket = 'blog-1251688297'
const Region = 'ap-chengdu'

// 初始化实例
var cos = new COS({
  getAuthorization: function(options, callback) {
    // 异步获取签名

    axios
      .get(`${process.env.baseUrl}/api/cos/sign`, {
        params: {
          bucket: options.Bucket,
          region: options.Region
        }
      })
      .then(({ status, data }) => {
        console.log('res', data)
        if (status === 200 && data.success) {
          callback({
            TmpSecretId: data.data.credentials.tmpSecretId,
            TmpSecretKey: data.data.credentials.tmpSecretKey,
            XCosSecurityToken: data.data.credentials.sessionToken,
            ExpiredTime: data.data.expiredTime
          })
        }
      })
  }
})

cos.cUploadFile = ({ file }) => {
  return new Promise((resolve, reject) => {
    cos.sliceUploadFile(
      {
        Bucket: Bucket,
        Region: Region,
        Key: file.name,
        Body: file
      },
      function(err, data) {
        console.log('err', err)
        console.log('data', data)
        if (err) {
          reject(err)
        } else if (data) {
          resolve('//' + data.Location)
        }
      }
    )
  })
}

Vue.prototype.$cos = cos
