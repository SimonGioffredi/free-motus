interface ContainerMotusAttemptInterface {
  id: number,
  word: string
}

export interface ContainerMotusAttemptsInterface extends Array<ContainerMotusAttemptInterface>{}
