import { type NewsItem } from "@/data/legislation";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TypeBadge({ type }: { type: "state" | "federal" | "industry" }) {
  const styles = {
    state: "bg-blue-100 text-blue-800",
    federal: "bg-purple-100 text-purple-800",
    industry: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[type]}`}
    >
      {type === "state" ? "State" : type === "federal" ? "Federal" : "Industry"}
    </span>
  );
}

export default function NewsFeed({ newsItems }: { newsItems: NewsItem[] }) {
  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="py-12 sm:py-16" id="news">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Latest Updates
          </h2>
          <p className="text-gray-600">
            Recent ICHRA legislative activity and news
          </p>
        </div>

        <div className="space-y-4">
          {sorted.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <time className="text-sm text-gray-400 font-medium">
                  {formatDate(item.date)}
                </time>
                <TypeBadge type={item.type} />
                {item.state && (
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {item.state}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {item.headline}
              </h3>
              <p className="text-sm text-gray-600">{item.summary}</p>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                >
                  Read more →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
