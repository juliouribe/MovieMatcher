import { Container, Flex, Grid } from '@radix-ui/themes'
import Image from 'next/image'

export default function Home() {
  return (
    <Container>
      {/* <Grid columns={{ initial: "1", md: "2" }} gap="5" justify="center" align="center"> */}
      <Flex direction="column" gap="4" justify="center" align="center">
        <h1>Hello</h1>
        <h1>Goodbye</h1>
      </Flex>
      {/* </Grid> */}
    </Container>
  )
}
