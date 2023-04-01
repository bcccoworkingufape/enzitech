export interface IResultExperiment {
  enzyme: {
    id: string
    name: string
    type: string
    formula: string
    variableA: number
    variableB: number
    duration: number
    weightSample: number
    weightGround: number
    size: number
  }
  processes: {
    process: {
      id: string
      name: string
      description: string
    },
    results: {
      id: string
      repetitionId: number
      sample: number
      whiteSample: number
      differenceBetweenSamples: number
      variableA: number
      variableB: number
      curve: number
      correctionFactor: number
      time: number
      volume: number
      weightSample: number
      result: number
    }[]
  }[]
}
