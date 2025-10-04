export class Set {
  constructor(info, nbReps) {
    this.info = info // string
    this.nbReps = nbReps // number
  }
}

export class Exercise {
  constructor(name, sets) {
    this.name = name // string
    this.sets = sets // array of Sets
  }
}

export class Workout {
  constructor(name, exercises) {
    this.name = name // string
    this.exercises = exercises // array of Exercises
  }
}

export function getOrderedSetsInWorkout(workout) {
  const sets = []
  for (let exercise of workout.exercises) {
    for (let set of exercise.sets) {
      sets.push(set)
    }
  }
  return sets
}
