import { Fragment } from "react";
// import { getEventById } from "../../dummy-data";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import EventAlert from '../../components/ui/error-alert';
import Head from "next/head";

function EventDetailPage(props) {
    const event = props.selectedEvent;

    if (!event) {
        return <EventAlert><p>No Event Found</p></EventAlert>
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.ti} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId

    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({ params: { eventId: event.id } }))

    return {
        paths: paths,
        fallback: 'blocking'
    }
}

export default EventDetailPage;