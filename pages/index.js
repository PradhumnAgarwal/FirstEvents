import Head from "next/head";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
// import { getFeaturedEvents } from "../dummy-data";

function HomePage(props) {
    return (
        <div>
            <Head>
                <title>Events-NextJS</title>
            </Head>
            <EventList items={props.events} />
        </div>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage;