import React from "react";

const Adds = () => {
  return (
    <React.Fragment>
      <div className="col-sm-3" style={{ height: "86vh", overflowY: "auto" }}>
        <h2 className="my-4">About Project</h2>
        <img
          src="https://socialify.git.ci/shelcia/Socialgram/image?font=Rokkitt&forks=1&issues=1&language=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Dark"
          alt="Socialgram"
          className="w-100 mb-4"
        />
        <a
          href="https://github.com/shelcia/Socialgram"
          title="Repository"
          style={{ fontSize: "1.2rem" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Repository Link
        </a>
        <h3 className="mt-3">How to Contribute?</h3>

        <ul style={{ fontStyle: "italic" }}>
          <li>
            Take a look at the Existing
            <a
              href="https://github.com/shelcia/Socialgram/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2"
            >
              Issues
            </a>
            or create your own Issues!
          </li>
          <li>
            Wait for the Issue to be assigned to you after which you can start
            working on it.
          </li>
          <li>
            Fork the Repo and create a Branch for any Issue that you are working
            upon.
          </li>
          <li>
            Read the
            <a
              href="https://github.com/shelcia/CRM/blob/master/CODE_OF_CONDUCT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2"
            >
              Code of Conduct
            </a>
          </li>
          <li>
            Create a Pull Request which will be promptly reviewed and
            suggestions would be added to improve it.
          </li>
          <li>
            Add Screenshots to help us know what this Script is all about.
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Adds;
