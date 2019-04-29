import { CONSTANT } from '../../../constant'

export const MESSAGES = {
	ERROR: {
		EMAIL_ALREADY_EXIST: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
			'message': "Email already exists.",
			'type': 'EMAIL_ALREADY_EXIST'
		},
		NOT_FOUND: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.UNAUTHORIZED,
			'message': "User not found",
			'type': 'NOT_FOUND'
		},
		INVALID_CREDENTIALS: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST,
			'message': "Invalid credentials were provided.",
			'type': 'INVALID_CREDENTIALS'
		}
	},
	SUCCESS: {
		CREATE_ADMIN: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.CREATED,
			'message': "Admin created successfully.",
			'type': 'CREATE_ADMIN'
		},
		CHANGE_FORGOT_PASSWORD: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.OK,
			'message': "Password changed successfully.",
			'type': 'CHANGE_FORGOT_PASSWORD'
		},
		ADMIN_LOGIN: {
			'statusCode': CONSTANT.HTTP_STATUS_CODE.OK,
			'message': "Admin logged in successfully.",
			'type': 'ADMIN_LOGIN'
		}
	}
};
export const DATA_PROJECT = {
	ADMIN_PROJECT: ['salt', 'hash', 'lastLogout', 'loginAttempts', 'password', 'created']
}