import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";
// import { getAllEvents } from "../../dummy-data";
import { getAllEvents } from "../../helpers/api-utils";
import { useRouter } from "next/router";
import Head from "next/head";

function AllEventsPages(props) {

    const router = useRouter();
    const { events } = props;

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
    }

    return (
        <Fragment>
            <Head>
                <title>All Events</title>
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    }

}



export default AllEventsPages;