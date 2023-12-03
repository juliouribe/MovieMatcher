import { Grid } from '@radix-ui/themes'
import Image from 'next/image'

export default function Home() {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <h1>Hello</h1>
      <h1>Goodbye</h1>
    </Grid>
  )
}
