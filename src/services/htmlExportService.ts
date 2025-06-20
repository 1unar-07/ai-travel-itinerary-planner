export interface ItineraryResponse {
  id: string;
  destination: string;
  numberOfDays: number;
  itinerary: DayItinerary[];
  createdAt: string;
}

export interface DayItinerary {
  day: number;
  activities: Activity[];
}

export interface Activity {
  time: string;
  activity: string;
  description: string;
  location?: string;
}

export const htmlExportService = {
  createHTMLContent(itinerary: ItineraryResponse): string {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${itinerary.destination} Itinerary</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #3B82F6; padding-bottom: 20px; }
          .destination { font-size: 36px; font-weight: bold; color: #3B82F6; margin-bottom: 10px; }
          .details { color: #666; font-size: 16px; }
          .day { margin: 30px 0; page-break-inside: avoid; }
          .day-header { background: linear-gradient(135deg, #3B82F6, #10B981); color: white; padding: 15px; border-radius: 8px; font-size: 20px; font-weight: bold; }
          .activity { margin: 15px 0; padding: 15px; border-left: 4px solid #3B82F6; background: #F8FAFC; }
          .time { font-weight: bold; color: #3B82F6; }
          .activity-name { font-size: 18px; font-weight: bold; margin: 5px 0; }
          .description { color: #666; line-height: 1.5; }
          .footer { margin-top: 40px; text-align: center; color: #666; border-top: 1px solid #E5E7EB; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="destination">${itinerary.destination}</div>
          <div class="details">${itinerary.numberOfDays} Day Travel Itinerary | Generated on ${new Date(itinerary.createdAt).toLocaleDateString()}</div>
        </div>
        
        ${itinerary.itinerary.map(day => `
          <div class="day">
            <div class="day-header">Day ${day.day}: ${itinerary.destination} Adventure</div>
            ${day.activities.map(activity => `
              <div class="activity">
                <div class="time">${activity.time}</div>
                <div class="activity-name">${activity.activity}</div>
                <div class="description">${activity.description}</div>
                ${activity.location ? `<div class="location">📍 ${activity.location}</div>` : ''}
              </div>
            `).join('')}
          </div>
        `).join('')}
        
        <div class="footer">
          <p>Have an amazing trip to ${itinerary.destination}! ✈️</p>
          <p>Generated by TravelMate AI</p>
        </div>
      </body>
      </html>
    `;

    return htmlContent;
  },

  exportToHTML(itinerary: ItineraryResponse): void {
    try {
      // Generate HTML content
      const htmlContent = this.createHTMLContent(itinerary);
      
      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${itinerary.destination.replace(/\s+/g, '_')}_Itinerary.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating HTML:", error);
      throw new Error("Failed to generate HTML. Please try again.");
    }
  }
}; 