import { about } from '../content'

const AboutSection = () => {
  return (
    <div className="space-y-12">
      <div className="text-center mb-16">
        <h2 className="heading-section mb-8">{about.heading}</h2>
        <p className="subheading-executive mx-auto">
          {about.subheading}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="premium-card">
          <div className="premium-card-content">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">{about.backgroundTitle}</h3>
            <p className="text-slate-400 leading-relaxed">
              {about.backgroundText}
            </p>
          </div>
        </div>

        <div className="premium-card">
          <div className="premium-card-content">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">{about.focusTitle}</h3>
            <p className="text-slate-400 leading-relaxed">
              {about.focusText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection 