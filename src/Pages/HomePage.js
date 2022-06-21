import React from 'react'
import Banner from '../Components/Banner/Banner'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../Components/ErrorBoundary';
// import Coinstable from '../Components/Coinstable'
const Coinstable = React.lazy(() => import('../Components/Coinstable'));
export default function HomePage() {
    return (
        <div>
            <Banner />
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Coinstable />
                </React.Suspense>
            </ErrorBoundary>
        </div>
    )
}
