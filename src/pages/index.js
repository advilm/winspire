import { AppShell, Header, useMantineTheme, Text, Group, Navbar } from '@mantine/core';
import * as THREE from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Home() {
  const theme = useMantineTheme();
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}

        header={
          <Header height={{ base: 90, md: 70 }} p="md">
            <Group position='apart'>
              <div style={{ display: 'flex', alighnItems: 'center', height: '100%' }}>
                <Text fz="xl" fw={700}>Winspire</Text>
              </div>
            </Group>
          </Header>
        }

        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 180 }}>
            <Text
              component="a"
              onClick={() => router.push('/')}
              sx={{ fontFamily: 'Greycliff CF, sans-serif', cursor: 'pointer' }}
              ta="center"
              fz="md"
              fw={525}
            >
              Home
            </Text>
            <Text
              component="a"
              onClick={() => router.push('/stories')}
              sx={{ fontFamily: 'Greycliff CF, sans-serif', cursor: 'pointer' }}
              ta="center"
              fz="md"
              fw={525}
            >
              Stories
            </Text>
          </Navbar>
        }
      >
        <THREE.Canvas>
          {/* <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} /> */}
          Text
        </THREE.Canvas>
      </AppShell>
    </>
  );
  // }
}

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  THREE.useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}
