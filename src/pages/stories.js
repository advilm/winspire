import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { AppShell, Modal, TextInput, Header, useMantineTheme, Text, MediaQuery, Burger, Navbar, Card, Badge, Button, Group, Box, Grid, Select } from '@mantine/core';
// import { GOOGLE_FONT_PROVIDER } from 'next/dist/shared/lib/constants';

export default function Home() {
  const regions = require('../../countries.json');

  const form = useForm({
    initialValues: {
      name: '',
      age: '',
      career: '',
      story: '',
      region: ''
    },

    validate: {
      name: (value) => (value !== '' ? null : 'Please include your first and last name'),
      age: (value) => (/^\d+$/.test(value) ? null : 'Invalid age'),
      career: (value) => (value !== '' ? null : 'Please include your career'),
    },
  });

  const [opened, setOpened] = useState(false);
  const [previewOpened, setPreviewOpened] = useState(false);
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json()).then(p => setPosts(p));
  }, []);

  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        styles={{
          modal: {
            width: '21rem'
          }
        }}
      >
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => {
            fetch('/api/posts', {
              method: 'POST',
              body: JSON.stringify(values),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(res => res.json())
              .then(p => {
                setPosts([...posts, p]);
                form.reset();
              });
          })}>
            <TextInput
              label="Name"
              placeholder="Full Name"
              data-autofocus
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Age"
              placeholder="Age"
              {...form.getInputProps('age')}
            />
            <TextInput
              label="Career"
              placeholder="Career"
              {...form.getInputProps('career')}
            />
            <TextInput
              label="Share your story!"
              placeholder="Story"
              {...form.getInputProps('story')}
            />
            <Select
              label="Region"
              placeholder="Pick one"
              data={regions}
              nothingFound="No options"
              searchable
              {...form.getInputProps('region')}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Modal
        opened={previewOpened}
        onClose={() => setPreviewOpened(false)}
        title={`${post.name}, ${post.age}, ${post.career}`}
      >
        <Text>
          {post.description}
        </Text>
      </Modal>

      <AppShell

        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}


        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 180 }}>
            <Text
              component="a"
              href='http://20.25.143.75:3001'
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
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

        header={
          <Header height={{ base: 80, md: 70 }} p="md">
            <Group position='apart'>
              <div style={{ display: 'flex', alighnItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text fz="xl" fw={700} ta="center">Winspire</Text>
              </div>
              <Button onClick={() => setOpened(true)}> Submit Your Story</Button>
            </Group>
          </Header>
        }
      >
        <Grid grow>
          {
            posts.map(p =>
              <Grid.Col key={post.id} span={4}>
                <Card withBorder shadow="sm" radius="md" p="lg" sx={{ minWidth: '340px' }}>
                  <Group mt="sm" position="apart">
                    <Text size="lg" weight={500}>
                      {p.name}, {p.age}, {p.career}
                    </Text>
                    <Badge size="sm">{p.region}</Badge>
                  </Group>

                  <Text size="sm" lineClamp={4} mt="xs">
                    {p.description}
                  </Text>

                  <Group mt="xs">
                    <Button radius="md" style={{ flex: 1 }} onClick={() => {setPost(p); setPreviewOpened(true);}}>
                     Show details
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>
            )
          }
        </Grid>
      </AppShell>
    </>
  );
  // }
}
