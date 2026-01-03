import { inject, injectable } from "inversify"
import { ClientProps } from "../../domain/model/Client"
import { ARepositoryDBImpement } from "../../../shared/infrastructure/repository/ARepositoryDBImpement"
import { DB } from "../../../shared/infrastructure/postgre.db"


@injectable()
export class ClientRepositoryImplement extends ARepositoryDBImpement<ClientProps, Number> {
	constructor(
		@inject(DB) private readonly db:DB
	) {
		super(db, 'client', ['name', 'last_name', 'email', 'address', 'password_hash'])
	}

	mapperEntity(document: any): ClientProps {
		return {
			_id: document.id,
			name: document.name,
			last_name: document.last_name,
			email: document.email,
			address: document.address,
			password_hash: document.password_hash
		}
	}
}
