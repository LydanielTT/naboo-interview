import { ActivityFragment } from "@/graphql/generated/types";
import { useGlobalStyles } from "@/utils";
import { Badge, Box, Button, Card, Grid, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

interface ActivityProps {
  activity: ActivityFragment;
  isAdmin?: boolean;
}

export function Activity({ activity, isAdmin = false }: ActivityProps) {
  const { classes } = useGlobalStyles();

  return (
    <Grid.Col span={4}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://dummyimage.com/480x4:3"
            height={160}
            alt="random image of city"
          />
        </Card.Section>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500} className={classes.ellipsis}>
            {activity.name}
          </Text>
          <Box ml={"auto"}>
            <FavoriteButton id={activity.id} />
          </Box>
        </Group>

        <Group mt="md" mb="xs">
          <Badge color="pink" variant="light">
            {activity.city}
          </Badge>
          <Badge color="yellow" variant="light">
            {`${activity.price}€/j`}
          </Badge>
        </Group>
        {isAdmin && (
          <Group mt="md" mb="xs">
            <Text size="sm" data-testid="date">{new Date(activity.createdAt).toLocaleDateString("fr-FR")}</Text> 
            {/* TODO use i18n and use locale */}
          </Group>
        )}

        <Text size="sm" color="dimmed" className={classes.ellipsis}>
          {activity.description}
        </Text>

        <Link href={`/activities/${activity.id}`} className={classes.link}>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Voir plus
          </Button>
        </Link>
      </Card>
    </Grid.Col>
  );
}
