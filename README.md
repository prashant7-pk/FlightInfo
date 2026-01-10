FlighInfo is an MVP app that renders the real time flight telementry data and show it through graph and charts.

Flow:
  1. Upon selection of any flight, user clicks on START button to get real time flight altitude and speed.
  2. Backend call is made every 5 seconds to get the flight data.
  3. A stub is used to act as an service that returns flight details along with altitude and speed.
  4. Kafka stores the data and pushes it to a map on certain interval. Kstream is used to calculate
     average percentage in increase and decrease of speed and altitude .
     
React is used in frontend along with library like Charts.js.
Spring Boot app serves as a backend . Kafka pub/sub and KStream is used for handling flight data every 5 seconds.
(Images: FlightGraph.png & Dashboard.png) 
