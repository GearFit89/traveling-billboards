export function getIsBuildPharse (){
  return process.env.NEXT_PHASE === 'phase-production-build'
}
