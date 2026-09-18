import { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourseGrid } from './components/CourseGrid';
import { GovtCertificationSection } from './components/GovtCertificationSection';
import { LabInfrastructureSection } from './components/LabInfrastructureSection';
import { CareerRoadmapSection } from './components/CareerRoadmapSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CourseModal } from './components/CourseModal';
import { FeeCalculatorModal } from './components/FeeCalculatorModal';
import { DemoBookingModal } from './components/DemoBookingModal';
import { CredentialVerificationModal } from './components/CredentialVerificationModal';
import { COURSES_DATA } from './data/coursesData';
import { Course } from './types';

const DEMO_SUCCESS_MESSAGE =
  'Demo class booked successfully! Our counselor will call you within 2 hours.';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [activeFeeCourse, setActiveFeeCourse] = useState<Course | null>(null);
  const [demoCourse, setDemoCourse] = useState<Course | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const hasOpenModal = Boolean(
    activeCourseModal ||
      activeFeeCourse ||
      isDemoModalOpen ||
      isVerifyModalOpen,
  );

  useEffect(() => {
    document.body.style.overflow = hasOpenModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasOpenModal]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const openDemoModal = (course?: Course) => {
    setDemoCourse(course ?? null);
    setIsDemoModalOpen(true);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    window.setTimeout(() => {
      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#1E293B]">
      <Navbar
        onOpenDemoModal={() => openDemoModal()}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
      />

      <main>
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={selectCategory}
          onSelectCourse={setActiveCourseModal}
          courses={COURSES_DATA}
          onOpenDemoModal={() => openDemoModal()}
          onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        />

        <CourseGrid
          courses={COURSES_DATA}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenSyllabus={setActiveCourseModal}
          onOpenFeeCalculator={setActiveFeeCourse}
          onOpenDemoBooking={openDemoModal}
        />

        <GovtCertificationSection
          onOpenDemoBooking={() => openDemoModal()}
          onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        />
        <LabInfrastructureSection onOpenDemoBooking={() => openDemoModal()} />
        <CareerRoadmapSection />
        <TestimonialsSection onOpenVerifyModal={() => setIsVerifyModalOpen(true)} />
        <FaqSection onOpenDemoBooking={() => openDemoModal()} />
      </main>

      <Footer
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        onOpenDemoBooking={openDemoModal}
      />

      <a
        href="https://wa.me/919876543210?text=Hello%20Smart%20Computer%20Training%20Institute%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Smart Computer Training Institute on WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#16A34A] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(22,163,74,0.3)] transition hover:-translate-y-0.5 hover:bg-[#15803D] focus:outline-none focus:ring-4 focus:ring-green-200"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {activeCourseModal && (
        <CourseModal
          course={activeCourseModal}
          onClose={() => setActiveCourseModal(null)}
          onOpenDemoBooking={(course) => {
            setActiveCourseModal(null);
            openDemoModal(course);
          }}
          onOpenFeeCalculator={(course) => {
            setActiveCourseModal(null);
            setActiveFeeCourse(course);
          }}
        />
      )}

      {activeFeeCourse && (
        <FeeCalculatorModal
          course={activeFeeCourse}
          onClose={() => setActiveFeeCourse(null)}
          onOpenDemoBooking={(course) => {
            setActiveFeeCourse(null);
            openDemoModal(course);
          }}
        />
      )}

      {isDemoModalOpen && (
        <DemoBookingModal
          initialCourse={demoCourse}
          onClose={() => {
            setIsDemoModalOpen(false);
            setDemoCourse(null);
          }}
          onSuccess={() => {
            setIsDemoModalOpen(false);
            setDemoCourse(null);
            setToastMessage(DEMO_SUCCESS_MESSAGE);
          }}
        />
      )}

      {isVerifyModalOpen && (
        <CredentialVerificationModal
          onClose={() => setIsVerifyModalOpen(false)}
        />
      )}

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 top-4 z-[70] flex max-w-md items-start gap-3 rounded-2xl border border-emerald-200 bg-white p-4 text-sm text-slate-700 shadow-[0_18px_50px_rgba(15,23,42,0.16)] sm:right-6 sm:top-6"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="font-bold text-slate-900">Booking confirmed</p>
            <p className="mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;