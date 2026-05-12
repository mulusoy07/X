export const generateParticles = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 5,
  }))
}
