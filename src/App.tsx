import { useMemo, useState } from "react";
import { useJobs } from "./useJobs";
import { useWallet } from "./useWallet";

function App() {
  const { data: jobs } = useJobs();

  const [searchInput, setSearchInput] = useState("");

  const joblist = useMemo(() => {
    if (!jobs) {
      return [];
    }

    const lowerCasedInput = searchInput.toLowerCase();

    const filteredJobs = jobs.filter(
      (job) =>
        job.name.toLowerCase().includes(lowerCasedInput) ||
        job.address.toLowerCase().includes(lowerCasedInput)
    );

    return filteredJobs;
  }, [jobs, searchInput]);

  const { connect, disconnect, publicKey } = useWallet();

  const handleClickConnect = async () => {
    if (publicKey) {
      disconnect();

      return;
    }

    await connect();
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "24px",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <button onClick={handleClickConnect}>
        {publicKey || "Connect to Phantom wallet"}
      </button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Jobs</h2>
        <input
          placeholder="Find a job (0x...)"
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
        <table style={{ width: "500px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            {joblist.map((job) => (
              <tr key={job.address}>
                <td>{job.name}</td>
                <td>{job.address}</td>
                <td>{job.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Register Job</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <input
            style={{ width: "100%" }}
            placeholder="Job contract address (0x...)"
          ></input>
          <button disabled={!publicKey} style={{ whiteSpace: "nowrap" }}>
            Register Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
