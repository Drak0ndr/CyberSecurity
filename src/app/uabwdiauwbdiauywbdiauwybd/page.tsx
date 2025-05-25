import { cookies } from 'next/headers';
import { baseUrl } from '../api/baseUrl';
import { Avatar, Button, Paper, Stack, Text } from '@mantine/core';

const Admin = async () => {
  const cookieStore = await cookies();
  const info = await (
    await fetch(`${baseUrl}/profile`, {
      headers: { Authorization: `Bearer ${cookieStore.get('token')?.value}` },
    })
  ).json();

  return (
    <Stack m="10px auto" maw={700} pr={10} pl={10}>
      <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          size={120}
          radius={120}
          mx="auto"
        />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {info.name}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          {info.description}
        </Text>

        <Button variant="default" fullWidth mt="md">
          Send message
        </Button>
      </Paper>
    </Stack>
  );
};

export default Admin;
