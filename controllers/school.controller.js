import db from "../config/db.js";

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

// addSchool
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Name must be a non-empty string",
      });
    }

    if (typeof address !== "string" || address.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Address must be a non-empty string",
      });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({
        success: false,
        message: "Latitude must inbetween -90 and 90",
      });
    }

    if (isNaN(lon) || lon < -180 || lon > 180) {
      return res.status(400).json({
        success: false,
        message: "Longitude must inbetween -180 and 180",
      });
    }
      const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?,?,?,?)`;

      const [result] = await db.execute(query, [
        name.trim(),
        address.trim(),
        lat,
        lon,
      ]);

      res.status(201).json({
        success: true,
        message: "School added successfully",
        schoolId: result.insertId,
      });
    
  } catch (error) {
    console.error("Error in addSchool:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const listSchools = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (lat === undefined || lon === undefined) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const userLat = parseFloat(lat);
    const userLon = parseFloat(lon);

    if (isNaN(userLat) || userLat < -90 || userLat > 90) {
      return res.status(400).json({
        success: false,
        message: "Latitude must inbetween -90 and 90",
      });
    }
    if (isNaN(userLon) || userLon < -180 || userLon > 180) {
      return res.status(400).json({
        success: false,
        message: "Longitude must inbetween -180 and 180",
      });
    }

    const [schools] = await db.execute("SELECT * FROM schools");

    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No schools found",
        data: [],
      });
    }

    const schoolsWithDist = schools.map((schools) => {
      const dist = getDistance(
        userLat,
        userLon,
        schools.latitude,
        schools.longitude,
      );

      return {
        ...schools,
        dist_km: parseFloat(dist.toFixed(2)),
      };
    });

    schoolsWithDist.sort((a, b) => a.dist_km - b.dist_km);

    res.status(200).json({
      success: true,
      total: schoolsWithDist.length,
      data: schoolsWithDist,
    });
  } catch (error) {
    console.error("Error in listSchools:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addSchool, listSchools };
