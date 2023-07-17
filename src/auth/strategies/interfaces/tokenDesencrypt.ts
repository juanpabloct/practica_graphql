export interface PayloadToken {
	id: number
	email: string
	active: boolean
	RolAnduser: RolAnduser[]
	_count: {
		RolAnduser: number
	}
	iat: number
	exp: number
}

interface RolAnduser {
	id: number
	userId: number
	rolId: number
	rol: {
		id: number
		name: string
	}
	User: {
		id: number
		email: string
		password: string
		active: boolean
	}
}
