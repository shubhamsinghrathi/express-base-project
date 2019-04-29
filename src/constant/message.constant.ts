import { CONSTANT } from './constants';

export const MESSAGES = {
	ERROR: {
		FIELD_VALIDATION_FAILED: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
			'message': "Field validation failed",
			'type': 'FIELD_VALIDATION_FAILED'
		},
		INTERNAL_SERVER_ERROR: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
			'message': "Internal server error",
			'type': 'INTERNAL_SERVER_ERROR'
		},
		SESSION_INVALID: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
			'message': "Invalid session token provided",
			'type': 'SESSION_INVALID'
		},
		SESSION_TOKEN_NOT_PROVIDED: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
			'message': "Session token  was not provided",
			'type': 'SESSION_TOKEN_NOT_PROVIDED'
		}
	},
	SUCCESS: {
		SUCCESS: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.OK,
			'message': "Success",
			'type': 'SUCCESS'
		}
	}
};