import { ActivityFragment } from "@/graphql/generated/types";
import { useGlobalStyles } from "@/utils";
import { Box, Button, Flex, Image, Text } from "@mantine/core";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

interface ActivityListItemProps {
  activity: ActivityFragment;
  isAdmin?: boolean;
}

export function ActivityListItem({ activity, isAdmin }: ActivityListItemProps) {
  const { classes } = useGlobalStyles();

  return (
    <Flex align="start" justify="space-between">
      <Flex gap="md" align="start">
        <Image src="https://dummyimage.com/125" radius="md" alt="random image of city" height="125" width="125" />
        <Box sx={{ maxWidth: "300px" }}>
          <Text className={classes.ellipsis}>{activity.city}</Text>
          <Text className={classes.ellipsis}>{activity.name}</Text>
          <Text className={classes.ellipsis}>{activity.description}</Text>
          <Text weight="bold" className={classes.ellipsis}>{`${activity.price}€/j`}</Text>
          {isAdmin && <Text>{new Date(activity.createdAt).toLocaleDateString()}</Text>}
          {/* TODO use i18n and use locale */}
        </Box>
      </Flex>
      <Flex gap="md" align="start">
        <FavoriteButton id={activity.id} />
        <Link href={`/activities/${activity.id}`} className={classes.link}>
          <Button variant="outline" color="dark">
            Voir plus
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
