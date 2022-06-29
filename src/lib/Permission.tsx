import { check, RESULTS, Permission, request } from 'react-native-permissions';

const checkPermission = (permission: Permission) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await check(permission)
      if (result === RESULTS.DENIED || result === RESULTS.UNAVAILABLE) {
        const requestResult = await request(permission)
        if (requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED) {
          resolve(`${permission} ${requestResult}`)
        } else {
          reject(`${permission} ${requestResult}`)
        }
      } else if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        resolve(`${permission} ${result}`)
      } else {
        reject(`${permission} ${result}`)
      }
    } catch (error) {
      reject(error)
    }

  })
}
export { checkPermission }