export class ResponseFormatUtil {
 static success(data: any = {}) {
  const result = {
   status: 'success',
   serverTime: new Date(),
   httpCode: 200,
   data
  };
  return result;
 }
}
