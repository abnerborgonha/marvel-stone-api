import ICreateUserDTO from './ICreateUserDTO'

interface IUpdateUserDTO extends Partial<ICreateUserDTO> {
  old_password?: string
}

export default IUpdateUserDTO
