import { ResponseFormatUtil } from "./ResponseFormatUtil";

describe("test response format util", () => {
 it('should return success response format correctly', () => {
  const result1 = ResponseFormatUtil.success({})
  const result2 = ResponseFormatUtil.success({
   id: "test",
   name: "test"
  })

  expect(result1).toEqual({
   "data": {},
   "httpCode": 200,
   "serverTime": result1.serverTime,
   "status": "success"
  })
  expect(result2).toEqual({
   "data": {
    "id": "test",
    "name": "test"
   },
   "httpCode": 200,
   "serverTime": result2.serverTime,
   "status": "success"
  })
 });
})
