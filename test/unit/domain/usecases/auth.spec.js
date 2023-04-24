import { describe, it, beforeEach, afterEach } from '@jest/globals'
import { createSandbox } from 'sinon'

class MissingParamError extends Error {
  constructor(paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

class AuthUseCase {
  #getUserByEmailRepository

  constructor({ getUserByEmailRepository } = {}) {
    this.#getUserByEmailRepository = getUserByEmailRepository
  }

  async auth(email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }

    await this.#getUserByEmailRepository.get(email)
  }
}

describe('AuthUseCase', () => {
  let sandbox = {}
  const getUserByEmailRepository = {
    email: null,
    get: async(email) => {
      getUserByEmailRepository.email = email
      return {
        id: 'any_id',
        password: 'any_password'
      }
    }
  }

  beforeEach(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should throw an error when getUserByEmailReposiotory throws error', () => {
    sandbox.stub(getUserByEmailRepository, 'get').rejects(new Error())
    const authUseCase = new AuthUseCase({ getUserByEmailRepository })

    const promise = authUseCase.auth('any_email@mail.com', 'any_password')

    expect(promise).rejects.toThrow()
  })

  it('should be throw an eror if no email is provided', () => {
    const authUseCase = new AuthUseCase({ getUserByEmailRepository })

    const promise = authUseCase.auth()

    expect(promise).rejects.toThrow('Missing param: email')
  })

  it('should be throw an eror if no password is provided', () => {
    const authUseCase = new AuthUseCase({ getUserByEmailRepository })

    const promise = authUseCase.auth('any_email')

    expect(promise).rejects.toThrow('Missing param: password')
  })

  it('should throw an error when invalid dependencies are provided', async() => {
    const authUseCases = [
      new AuthUseCase(),
      new AuthUseCase({}),
      new AuthUseCase({
        getUserByEmailRepository: { anyInvalidMethod: () => {} }
      })
    ]

    for (const authUseCase of authUseCases) {
      const promise = authUseCase.auth('any_email@mail.com', 'any_password')
      expect(promise).rejects.toThrow()
    }
  })

  it('should call GetUserByEmailRepository with correct email', async() => {
    const authUseCase = new AuthUseCase({ getUserByEmailRepository })

    await authUseCase.auth('any_email@mail.com', 'any_password')

    expect(getUserByEmailRepository.email).toBe('any_email@mail.com')
  })
})
