'use client';

import { ActionIcon, Avatar, Badge, Card, Group, Progress, Stack, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { baseUrl } from '../api/baseUrl';
import Cookies from 'js-cookie';

const avatars = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
];

const DevLog = async () => {
  const onClick = async () => {
    const info = await (await fetch(`${baseUrl}/testToken`)).json();
    const token = info.token;
    Cookies.set('token', token);
  };
  return (
    <Stack maw={700} pr={10} pl={10} style={{ margin: '10px auto' }}>
      <Card withBorder padding="lg" radius="md">
        <Group justify="space-between">
          <Avatar src={avatars[0]} radius="xl" size={32} />
          <Badge>12 days left</Badge>
        </Group>
        <Text fz="lg" fw={500} mt="md">
          5.3 minor release (September 2022)
        </Text>
        <Text fz="sm" c="dimmed" mt={5}>
          after several generations of juniors on a free internship, we finally finished the jwt
          tokens, in the next release we plan to make normal authorization and registration, but I&apos;m
          afraid this maneuver will cost us 10 years. ps, click on the button to overwrite your
          token with a test one. if anyone reads this, please spam the guy &quot;/uabwdiauwbdiauywbdiauwybd&quot;
        </Text>

        <Text c="dimmed" fz="sm" mt="md">
          Tasks completed:{' '}
          <Text span fw={500} c="bright">
            23/36
          </Text>
        </Text>

        <Progress value={(23 / 36) * 100} mt={5} />

        <Group justify="space-between" mt="md">
          <Avatar.Group spacing="sm">
            <Avatar src={avatars[0]} radius="xl" />
            <Avatar src={avatars[1]} radius="xl" />
            <Avatar src={avatars[2]} radius="xl" />
            <Avatar radius="xl">+5</Avatar>
          </Avatar.Group>
          <ActionIcon variant="default" size="lg" radius="md" onClick={onClick}>
            <IconUpload size={18} />
          </ActionIcon>
        </Group>
      </Card>
    </Stack>
  );
};

export default DevLog;
